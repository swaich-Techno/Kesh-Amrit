export const whatsappNumber = "919914809080";

export const defaultOrderMessage =
  "Sat Sri Akal ji, I want to order Keshamrit Herbal Hair Oil. Please share details.";

export function whatsappLink(message = defaultOrderMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function orderMessageFromForm(input: {
  name: string;
  phone: string;
  city: string;
  quantity: string;
  address: string;
}) {
  const lines = [
    "Sat Sri Akal ji, I want to order Keshamrit Herbal Hair Oil.",
    `Name: ${input.name || "Not shared"}`,
    `Phone: ${input.phone || "Not shared"}`,
    `City: ${input.city || "Not shared"}`,
    `Quantity: ${input.quantity || "1"}`,
    `Address: ${input.address || "Not shared"}`,
    "Product: Keshamrit Herbal Hair Oil",
    "Please confirm COD and delivery details."
  ];

  return lines.join("\n");
}
