const Sidebar = () => {
  return (
    <>
      <div className="drawer-side shadow-lg h-screen">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <a>Menu Item</a>
          </li>
          <li>
            <a>Menu Item</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
