import { Button, Container } from "../components";

function Home() {
    // const StoreData = useSelector((state) => state.auth.userData);
    // const getDetails = async () => {
    //     const ServerData = await appwriteService.getCurrentUser();
    //     console.log("data from server", ServerData);
    //     console.log("data from store", StoreData);
    // };

    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <h1>Home page is under Development</h1>
            </Container>

            {/* <Button
                title={"Get Data in console"}
                className="bg-gray-700 text-white/90 px-4 py-1.5 "
                onClick={getDetails}
            /> */}
        </div>
    );
}

export default Home;
