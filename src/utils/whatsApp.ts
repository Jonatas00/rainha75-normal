export function formatWhatsApp(input: string): string {
  // Remover caracteres não numéricos
  const numbersOnly = input.replace(/\D/g, "");

  // Formatar o número no padrão "11 91234-5678"
  if (numbersOnly.length === 11) {
    return `${numbersOnly.slice(0, 2)} ${numbersOnly.slice(2, 7)}-${numbersOnly.slice(7)}`;
  }
  return numbersOnly;
}