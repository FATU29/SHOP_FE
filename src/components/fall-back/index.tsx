// ** MUI Imports
import { Modal, useTheme } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook

  const theme = useTheme()

  return (
    <Modal
      open={true}
      sx={{
        height: '100vh',
        width: "100vw",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <CircularProgress variant="indeterminate" autoFocus={false} disableShrink
        sx={{
          zIndex: "1600", "&:focus": {
            outline: 'none'
          }
        }} />
    </Modal>
  )
}

export default FallbackSpinner
