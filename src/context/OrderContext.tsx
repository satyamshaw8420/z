import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface OrderCtx {
  lines: CartLine[];
  count: number;
  total: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  add: (item: { id: string; name: string; price: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const Ctx = createContext<OrderCtx | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const add = useCallback(
    (item: { id: string; name: string; price: number }) => {
      setLines((prev) => {
        const found = prev.find((l) => l.id === item.id);
        if (found) {
          return prev.map((l) =>
            l.id === item.id ? { ...l, qty: l.qty + 1 } : l
          );
        }
        return [...prev, { ...item, qty: 1 }];
      });
    },
    []
  );

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, total } = useMemo(() => {
    return {
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.price, 0),
    };
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      count,
      total,
      drawerOpen,
      setDrawerOpen,
      add,
      remove,
      setQty,
      clear,
    }),
    [lines, count, total, drawerOpen, add, remove, setQty, clear]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOrder(): OrderCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
  return ctx;
}

export function buildWhatsAppOrder(
  lines: CartLine[],
  total: number,
  note: string
): string {
  const items = lines
    .map((l) => `• ${l.name} × ${l.qty} — ₹${l.price * l.qty}`)
    .join("\n");
  return [
    "Hi Zorko Howrah! I'd like to place an order:",
    "",
    items,
    "",
    `Total: ₹${total}`,
    note.trim() ? `Note: ${note.trim()}` : "",
    "",
    "Please confirm availability and pickup/delivery time. 🙏",
  ]
    .filter(Boolean)
    .join("\n");
}
