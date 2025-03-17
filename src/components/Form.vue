<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { reactive } from "vue";

// Definindo um tipo para o formulário
type FormType = {
  cpf: string;
  nome: string;
  whatsapp: number;
  email: string;
  dataFormacao: string;
  dataSaida: string;
  dataNasc: string;
  filhoMatriculado: string;
};

// Criando um objeto reativo com tipagem correta
const form = reactive<FormType>({
  cpf: "",
  nome: "",
  whatsapp: 0, // Alterado para number
  email: "",
  dataFormacao: "",
  dataSaida: "",
  dataNasc: "",
  filhoMatriculado: "",
});

// Resetando os valores do formulário
const resetForm = () => {
  Object.assign(form, {
    cpf: "",
    nome: "",
    whatsapp: 0, // Reseta como número
    email: "",
    dataFormacao: "",
    dataSaida: "",
    dataNasc: "",
    filhoMatriculado: "",
  });
};

// Enviando os dados via POST
async function handleSubmit() {
  try {
    const response = await fetch(import.meta.env.VITE_SOME_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        whatsapp: String(form.whatsapp), // Convertendo para string antes de enviar
      }),
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
          v-model.number="form.whatsapp"
          class="p-2 w-full"
          placeholder="DDD + número"
          required
          type="number"
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
          placeholder="Ex: 2005"
          type="text"
        />
      </div>

      <div>
        <label for="anoSaida">
          Caso não tenha terminado o ensino médio no Rainha, qual ano saiu do colégio?
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
          v-model="form.filhoMatriculado"
          class="p-2 w-full border block"
          id="possuiFilho"
          :class="{
            'text-neutral-400': !form.filhoMatriculado,
            'text-black': form.filhoMatriculado,
          }"
        >
          <option value="" disabled selected>Selecione uma opção</option>
          <option value="Sim" class="text-black">Sim</option>
          <option value="Não" class="text-black">Não</option>
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
