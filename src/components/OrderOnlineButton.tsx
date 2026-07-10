import { orderUrl } from "@/lib/site-content";

export default function OrderOnlineButton({
  className,
  label = "Order online",
}: {
  className: string;
  label?: string;
  onOpen?: () => void;
}) {
  return (
    <a href={orderUrl} target="_blank" rel="noreferrer" className={className}>
      {label}
    </a>
  );
}
