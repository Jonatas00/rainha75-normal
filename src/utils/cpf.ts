export const formatCPF = (input: string): string => {
  let cpf = input.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (cpf.length > 11) {
    cpf = cpf.slice(0, 11); // Limita a 11 dígitos
  }
  if (cpf.length > 9) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cpf.length > 6) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else if (cpf.length > 3) {
    cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  }
  return cpf;
};