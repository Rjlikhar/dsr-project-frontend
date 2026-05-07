const getLabel = (path) => {
  switch (path) {
    case "/":
      return "Dashboard";
    case "/create-dsr":
      return "Create DSR";
    case "/profile":
      return "Profile";
    default:
      return "Page";
  }
};

const getBadge = (path) => {
  if (path === "/create-dsr") return "New";
  return null;
};

const getIcon = (path) => {
  switch (path) {
    case "/":
      return (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            d="M3 12l2-2 7-7 7 7 2 2M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3" />
        </svg>
      );

    case "/create-dsr":
      return (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      );

    case "/profile":
      return (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );

    default:
      return null;
  }
};


export const mapRoutesToNav = (routes) => {
  return routes.map((route) => {
    const path = route.index ? "/" : route.path;

    return {
      label: getLabel(path),
      path: path,
      icon: getIcon(path),
      badge: getBadge(path),
    };
  });
};