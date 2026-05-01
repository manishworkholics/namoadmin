export const stores = [
  { value: "andheri", label: "Namo Andheri" },
  { value: "bandra", label: "Namo Bandra" },
  { value: "thane", label: "Namo Thane" },
  { value: "powai", label: "Namo Powai" },
];

export const departments = [
  { value: "kitchen", label: "Kitchen" },
  { value: "front-counter", label: "Front Counter" },
  { value: "packing", label: "Packing" },
  { value: "housekeeping", label: "Housekeeping" },
];

export const inventoryItems = [
  {
    id: "rice-premium",
    name: "Premium Basmati Rice",
    category: "Grains",
    unit: "KG",
    stock: 148,
  },
  {
    id: "cooking-oil",
    name: "Refined Cooking Oil",
    category: "Oil",
    unit: "Litre",
    stock: 82,
  },
  {
    id: "paneer",
    name: "Fresh Paneer",
    category: "Dairy",
    unit: "KG",
    stock: 34,
  },
  {
    id: "paper-bowl",
    name: "Paper Bowl Small",
    category: "Packaging",
    unit: "Packet",
    stock: 220,
  },
  {
    id: "tea-premix",
    name: "Tea Premix",
    category: "Beverages",
    unit: "Packet",
    stock: 46,
  },
];

export const issueHistory = [
  {
    id: "issue-1007",
    store: "Namo Andheri",
    department: "Kitchen",
    submittedBy: "Rahul Sharma",
    dateTime: "30 Apr 2026, 10:45 AM",
    status: "Approved",
    items: [
      { name: "Premium Basmati Rice", qty: "12 KG" },
      { name: "Fresh Paneer", qty: "4 KG" },
      { name: "Refined Cooking Oil", qty: "6 Litre" },
    ],
  },
  {
    id: "issue-1006",
    store: "Namo Bandra",
    department: "Front Counter",
    submittedBy: "Priya Nair",
    dateTime: "29 Apr 2026, 06:20 PM",
    status: "Pending",
    items: [
      { name: "Paper Bowl Small", qty: "25 Packet" },
      { name: "Tea Premix", qty: "8 Packet" },
    ],
  },
  {
    id: "issue-1005",
    store: "Namo Powai",
    department: "Packing",
    submittedBy: "Amit Verma",
    dateTime: "29 Apr 2026, 01:15 PM",
    status: "Issued",
    items: [
      { name: "Paper Bowl Small", qty: "40 Packet" },
      { name: "Premium Basmati Rice", qty: "10 KG" },
    ],
  },
];
