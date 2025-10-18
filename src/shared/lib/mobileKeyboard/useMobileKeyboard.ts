import { useOs } from "@mantine/hooks"
import { useEffect } from "react"


export const useMobileKeyboard = () =>{
  const os = useOs({

  })
  const mobile = os === "android" || os === "ios"

  useEffect(()=>{

  },[])

}
