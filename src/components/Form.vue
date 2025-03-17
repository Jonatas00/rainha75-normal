<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { reactive } from "vue";

// Define the type for form data
type FormType = {
  cpf: string;
  nome: string;
  whatsapp: string; // Changed to string to match the input data
  email: string;
  dataFormacao: string;
  dataSaida: string;
  dataNasc: string;
  filhoMatriculado: string;
};

// Create a reactive form object with proper typing
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

// Function to reset the form values
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

// Submit handler to send the form data via POST
async function handleSubmit(): Promise<void> {
  try {
    const response = await fetch(import.meta.env.VITE_SOME_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      alert(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Data sent successfully:", result);
    resetForm();
  } catch (error) {
    console.error("Error sending data:", error);
    resetForm();
  }
}
</script>

<template>
  <div class="shadow-lg bg-white p-4 rounded-lg">
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label for="cpf">CPF</label>
        <input
          id="cpf"
          v-model="form.cpf"
          class="p-2 w-full"
          placeholder="000.000.000-00"
          required
          type="text"
        />
      </div>

      <div>
        <label for="nome">Nome</label>
        <input
          id="nome"
          v-model="form.nome"
          class="p-2 w-full"
          placeholder="Nome completo"
          required
          type="text"
        />
      </div>

      <div>
        <label for="dataNascimento">Data de Nascimento</label>
        <input
          id="dataNascimento"
          v-model="form.dataNasc"
          class="text-neutral-400 p-2 w-full"
          required
          type="date"
        />
      </div>

      <div>
        <label for="whatsapp">WhatsApp</label>
        <input
          id="whatsapp"
          v-model="form.whatsapp"
          class="p-2 w-full"
          placeholder="ddd + número"
          required
          type="text"
        />
      </div>

      <div>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          class="p-2 w-full"
          placeholder="email@gmail.com"
          required
          type="email"
        />
      </div>

      <div>
        <label for="anoFormacao">Ano que se formou no Rainha</label>
        <input
          id="anoFormacao"
          v-model="form.dataFormacao"
          class="p-2 w-full"
          placeholder="Ex: 2005"
          type="text"
        />
      </div>

      <div>
        <label for="anoSaida">
          Caso não tenha terminado o ensino médio no Rainha, qual ano saiu do
          colégio?
        </label>
        <input
          id="anoSaida"
          v-model="form.dataSaida"
          class="p-2 w-full"
          type="date"
        />
      </div>

      <div>
        <label for="possuiFilho">Possui filho matriculado no Rainha?</label>
        <select
          id="possuiFilho"
          v-model="form.filhoMatriculado"
          class="p-2 w-full border block"
          :class="{
            'text-neutral-400': !form.filhoMatriculado,
            'text-black': form.filhoMatriculado,
          }"
        >
          <option value="" disabled selected>Selecione uma opção</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>
      </div>

      <Button class="flex w-50 hover:bg-[#415272]">Enviar</Button>
    </form>
  </div>
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
