import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type ToastMutationOptions<TData, TError, TVariables> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  loadingMessage: string;
  successMessage: string;
  errorMessage: string;
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">;
};

/**
 * Custom Tanstack Query mutation hook with integrated toast notifications using Sonner.
 *
 * This hook simplifies the usage of `useMutation` by automatically displaying
 * toast messages for loading, success, and error states.
 *
 * It is particularly useful in cases where consistent UX feedback is needed across the app.
 *
 * @template TData      - Type of the data returned by the mutation function
 * @template TError     - Type of the error returned by the mutation function
 * @template TVariables - Type of the variables accepted by the mutation function
 *
 * @param mutationFn      - The async function that performs the mutation
 * @param loadingMessage  - Message displayed during the loading state
 * @param successMessage  - Message displayed on successful mutation
 * @param errorMessage    - Message displayed if the mutation fails
 * @param options         - Additional options for Tanstack Query's `useMutation` (except mutationFn)
 *
 * @returns A wrapped version of `useMutation` with toast notifications included.
 */
export function useToastMutation<TData, TError = Error, TVariables = void>({
  mutationFn,
  loadingMessage,
  successMessage,
  errorMessage,
  options = {},
}: ToastMutationOptions<TData, TError, TVariables>) {
  const { onSuccess, onError, ...restOptions } = options;

  return useMutation({
    ...restOptions,
    mutationFn,
    onMutate: () => {
      const toastId = toast.loading(loadingMessage);
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success(successMessage);
      onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error(errorMessage);
      console.error(errorMessage, error);
      onError?.(error, variables, context);
    },
  });
}
