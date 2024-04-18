
export default function AddressLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-background min-h-screen w-screen flex items-center justify-center">
  {children}
</div> 
}
