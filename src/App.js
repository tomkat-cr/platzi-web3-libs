import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import useContractFunctions from "./hooks/useContractFunctions";
import useWalletData from "./hooks/useWalletData";

import InternalLayout from "./layouts/internal";
// import CallToActionWithIllustration from "./layouts/home/hero";

import Home from "./views/home";
import NotFound from "./views/not-found";

function App() {
  const [user, setUser] = useState('');
  const {active} = useWalletData()
  const {
    guessUserType
  } = useContractFunctions()

  useEffect(() => {
    guessUserType().then(
      type => setUser(type)
    )
  }, [guessUserType])

  return (
    <InternalLayout>
      <Box bg={'gray.50'}>
        <Routes>
          <>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
          </>
        </Routes>
      </Box>
      {/* <CallToActionWithIllustration /> */}
    </InternalLayout>
  )
}

export default App;
