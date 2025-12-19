import { Outlet } from "react-router-dom";



function RootLayout() {

  // const navigation = useNavigation();

  return (
    <>
      <main className="container mx-auto px-4">
        <Outlet/>
      </main>
    </>
  );
}

export default RootLayout;
