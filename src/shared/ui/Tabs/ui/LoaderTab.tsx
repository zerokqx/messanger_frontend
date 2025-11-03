import { LoadingOverlay } from "@mantine/core"


export const LoaderTab = (tab)=>{

  const constext
  return (

        <LoadingOverlay
          visible
          overlayProps={{
            radius: 'xs',
            blur: 2,
            bg: 'black',
            opacity: 0.3,
            zIndex: 1099000,
          }}
        />
  )
}
