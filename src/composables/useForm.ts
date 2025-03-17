import { ref } from "vue";

export function newFormData<T>(initialData: T) {
    const form = ref(initialData);

    const resetForm = () => {
        form.value = { ...initialData };
    };

    return {
        form,
        resetForm,
    };
}
