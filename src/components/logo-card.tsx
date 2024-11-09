export function LogoCard() {
  return (
    <div className="flex items-center">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
        <img src="/logo.png" alt="logo" className="size-6" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">CRONEXIA</span>
      </div>
    </div>
  );
}
