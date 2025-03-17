<script lang="ts" setup>
import { Button } from "@/components/ui/button";

const { form } = newFormData({
  cpf: "",
  nome: "",
  whatsapp: "",
  email: "",
  dataFormacao: "",
  dataSaida: "",
  dataNasc: "",
  filhoMatriculado: "",
});

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    form[key] = "";
  });
};

async function handleSubmit() {
  try {
    const response = await fetch(import.meta.env.VITE_SOME_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: form,
    });

    if (!response.ok) {
      alert(`Erro: ${response.status} - ${response.statusText}`);
    }

    const resultado = await response.json();
    console.log("Dados enviados com sucesso:", resultado);

    resetForm();
  } catch (erro) {
    console.error("Erro ao enviar os dados:", erro);

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
          placeholder="Email"
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
          max="2024"
          min="1950"
          placeholder="Ex: 2005"
          type="number"
        />
      </div>

      <div>
        <label for="anoSaida"
          >Caso não tenha terminado o ensino médio no Rainha, qual ano saiu do
          colégio?
        </label>
        <input
          id="anoSaida"
          v-model="form.dataSaida"
          class="p-2 w-full"
          placeholder="Ex: 2005"
          type="number"
        />
      </div>

      <div>
        <label for="possuiFilho"> Possui filho matriculado no Rainha? </label>
        <select
          v-model="form.filhoMatriculado"
          class="p-2 w-full border block"
          id="possuiFilho"
          :class="{
            'text-neutral-400': !form.filhoMatriculado,
            'text-black': form.filhoMatriculado,
          }"
        >
          <option :value="form.filhoMatriculado" selected disabled>
            Possui filho matriculado no Rainha?
          </option>
          <option value="Sim" class="text-black">Sim</option>
          <option value="Não" class="text-black">Não</option>
        </select>
      </div>

      <Button class="flex w-50 hover:bg-[#415272]"> Enviar </Button>
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

input select {
  @apply text-neutral-400;
  border-radius: calc(var(--radius) - 2px);
  border-width: 1px;
  --tw-bg-opacity: 1;
  background-color: rgb(250 250 250 / var(--tw-bg-opacity, 1));
  padding-left: 0.75rem;
  padding-right: 0.75rem;

  value {
    color: black;
  }
}

option[disabled] {
  @apply text-neutral-300;
}
</style>
