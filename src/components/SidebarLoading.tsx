export const SidebarLoading = () => {
  return (
    <div className="flex flex-col space-y-2">
      {Array.from(new Array(5)).map((i) => (
        <div
          key={i}
          className="h-7 w-full animate-pulse rounded-md bg-neutral-600"
        />
      ))}
    </div>
  );
};
