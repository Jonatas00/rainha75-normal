<script lang="ts" setup>
import AlertComponent from "@/components/AlertComponent.vue";
import { Button } from "@/components/ui/button";
import { formatCPF, isValidCPF } from "@/utils/cpf";
import { formatWhatsApp } from "@/utils/whatsapp";
import { reactive, ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue"; // Correct import

// Define the type for the form
type FormType = {
  cpf: string;
  nome: string;
  whatsapp: string;
  email: string;
  dataFormacao: string;
  dataSaida: string;
  dataNasc: string;
  filhoMatriculado: string;
};

// Form state
const form = reactive<FormType>({
  cpf: "",
  nome: "",
  whatsapp: "",
  email: "",
  dataFormacao: "",
  dataSaida: "",
  dataNasc: "",
  filhoMatriculado: "",
});

// Alert state
const alertState = reactive({
  error: false,
  message: "",
  statusCode: 0,
});

// Loading state
const isLoading = ref(false);

// Reset form and alert state
const resetForm = (): void => {
  Object.assign(form, {
    cpf: "",
    nome: "",
    whatsapp: "",
    email: "",
    dataFormacao: "",
    dataSaida: "",
    dataNasc: "",
    filhoMatriculado: "",
  });
};

// Reference for the ModalComponent
const modalRef = ref<InstanceType<typeof ModalComponent> | null>(null);

async function handleSubmit(): Promise<void> {
  if (isLoading.value) return; // Prevent multiple submissions

  // Reset alert state before request
  alertState.error = false;
  alertState.message = "";
  alertState.statusCode = 0;
  isLoading.value = true;

  if (form.cpf.replace(/\D/g, "").length !== 11) {
    alertState.error = true;
    alertState.message = "CPF deve ter 11 dígitos!";
    alertState.statusCode = 400; // Bad Request
    isLoading.value = false;
    return;
  }

  if (!isValidCPF(form.cpf)) {
    alertState.error = true;
    alertState.message = "CPF inválido!";
    alertState.statusCode = 400; // Bad Request
    isLoading.value = false;
    return;
  }

  if (form.whatsapp.replace(/\D/g, "").length !== 11) {
    alertState.error = true;
    alertState.message = "Número de celular inválido!";
    alertState.statusCode = 400; // Bad Request
    isLoading.value = false;
    return;
  }

  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let result;
    try {
      result = await response.json();
    } catch (error) {
      // In case parsing fails, set a default message
      result = { message: "Resposta inesperada do servidor." };
    }

    if (response.ok) {
      alertState.error = false;
      alertState.message = "Formulário enviado com sucesso!";
      alertState.statusCode = response.status;

      // Use optional chaining to avoid errors if modalRef.value is null
      modalRef.value?.openModal();
      resetForm();
    } else {
      alertState.error = true;
      alertState.message =
        result.message || `Erro ${response.status}: ${response.statusText}`;
      alertState.statusCode = response.status;
    }
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    alertState.error = true;
    alertState.message = "Erro inesperado. Tente novamente mais tarde.";
    alertState.statusCode = 500;
  } finally {
    isLoading.value = false;
  }
}

const updateCPF = (): void => {
  form.cpf = formatCPF(form.cpf);
};

const updateWhatsApp = (): void => {
  form.whatsapp = formatWhatsApp(form.whatsapp);
};
</script>

<template>
  <!-- Alert Component -->
  <AlertComponent v-if="alertState.message" :message="alertState.message" :statusCode="alertState.statusCode" />

  <div class="shadow-lg bg-white p-4 rounded-lg">
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label for="cpf">CPF</label>
        <input id="cpf" v-model="form.cpf" @input="updateCPF" class="p-2 w-full" placeholder="000.000.000-00" required
          type="text" inputmode="numeric" />
      </div>

      <div>
        <label for="nome">Nome</label>
        <input id="nome" v-model="form.nome" class="p-2 w-full" placeholder="Nome completo" required type="text" />
      </div>

      <div>
        <label for="dataNascimento">Data de Nascimento</label>
        <input id="dataNascimento" v-model="form.dataNasc" class="text-neutral-400 p-2 w-full" required type="date" />
      </div>

      <div>
        <label for="whatsapp">WhatsApp</label>
        <input id="whatsapp" v-model="form.whatsapp" @input="updateWhatsApp" class="p-2 w-full"
          placeholder="ddd + telefone" required type="text" inputmode="numeric" maxlength="15" />
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" v-model="form.email" class="p-2 w-full" placeholder="email@gmail.com" required type="email"
          inputmode="email" />
      </div>

      <div>
        <label for="anoFormacao">Ano que se formou no Rainha</label>
        <input id="anoFormacao" max="2024" v-model="form.dataFormacao" class="p-2 w-full" placeholder="Ex: 2005"
          type="number" inputmode="numeric" required />
      </div>

      <div>
        <label for="anoSaida">
          Caso não tenha terminado o ensino médio no Rainha, qual ano saiu do colégio?
        </label>
        <input id="anoSaida" max="2024" v-model="form.dataSaida" placeholder="Ex: 2005" class="p-2 w-full" type="number"
          inputmode="numeric" required />
      </div>

      <div>
        <label for="possuiFilho">Possui filho matriculado no Rainha?</label>
        <select id="possuiFilho" v-model="form.filhoMatriculado" class="p-2 w-full border block">
          <option value="" disabled>Selecione uma opção</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>
      </div>

      <Button class="flex w-50 hover:bg-[#415272]" :disabled="isLoading">Enviar</Button>
    </form>
  </div>

  <!-- Include ModalComponent with ref -->
  <ModalComponent v-if="alertState.statusCode === 200" ref="modalRef" />
</template>

<style scoped>
input,
option,
select {
  @apply bg-neutral-50 border rounded-md px-3;
}

input::placeholder {
  @apply text-neutral-400;
}

option[disabled] {
  @apply text-neutral-300;
}
</style>
