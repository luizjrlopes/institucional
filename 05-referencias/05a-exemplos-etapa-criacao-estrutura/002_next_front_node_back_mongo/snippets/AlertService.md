# Codigo do arquivo utils/AlertService.tsx

```typescript
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showAlert = (title: string, text: string) => {
  MySwal.fire({
    title: title,
    text: text,
    icon: "info",
    confirmButtonText: "OK",
  });
};
export const showSuccess = (title: string, text: string) => {
  MySwal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const showError = (title: string, html: string) => {
  MySwal.fire({
    title: `<strong>${title}</strong>`,
    html: html,
    icon: "error",
    confirmButtonText: "OK",
  });
};

export const showConfirm = async (
  title: string,
  text: string,
  confirmButtonText: string,
  cancelButtonText: string
): Promise<boolean> => {
  const result = await MySwal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    reverseButtons: true,
  });

  return result.isConfirmed;
};
```
