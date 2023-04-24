import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCarts, getCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useCart() {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const cartQuery = useQuery(
    ["carts", user.uid || ""],
    () => getCart(user.uid),
    {
      enabled: !!user.uid,
    }
  );

  const addOrUpdateToItem = useMutation(
    (product) => addOrUpdateToCarts(user.uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", user.uid]);
      },
    }
  );

  const removeItem = useMutation((id) => removeFromCart(user.uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", user.uid]);
    },
  });

  return { cartQuery, addOrUpdateToItem, removeItem };
}
