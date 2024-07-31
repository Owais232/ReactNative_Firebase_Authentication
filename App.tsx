import { NavigationContainer } from "@react-navigation/native";
import Stackscreen from "./android/src/navigation/Stack";
import { AuthProvider } from "./android/src/context/Authcontext";



const App=()=>{
  return(
  <AuthProvider>
    <NavigationContainer>
    
      <Stackscreen/>
      </NavigationContainer>
      </AuthProvider>
    
    
  );
};

export default App;