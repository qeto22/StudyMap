import ReactFullpage from "@fullpage/react-fullpage";
import NavigationBar from "../navbar/NavigationBar";
import WelcomeBody from "./WelcomeBody";


function WelcomeContent() {
    return (
        <ReactFullpage scrollingSpeed={1000}
            render={({state, fullPageApi}) => {
                return (
                    <ReactFullpage.Wrapper>
                        <div className="section" style={{minHeight: "100vh", display: "block"}}>
                            <NavigationBar />
                            <WelcomeBody />
                        </div>
                        <div className="section" style={{minHeight: "100vh", display: "block"}}>
                            <h1>Test</h1>
                        </div>
                    </ReactFullpage.Wrapper>
                );
        }} />
    )
}

export default WelcomeContent;