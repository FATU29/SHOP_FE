// ** MUI Imports
import { Modal, ModalProps, styled, useTheme } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import zIndex from '@mui/material/styles/zIndex'


const CustomModal = styled(Modal)<ModalProps>(({ theme }) => {
  return {
    "&.MuiModal-root": {
      width: "100%",
      height: "100%",
      zIndex: 9999,
      ".MuiModal-backdrop": {
        backgroundColor:`rgba(${theme.palette.customColors.main},0.7)`
      }
    }
  }
})


const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  const theme = useTheme();

  return (
    <CustomModal open={true}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          ...sx
        }}
      >
        <CircularProgress disableShrink sx={{ mt: 6 }} />
      </Box>

    </CustomModal>
  )
}

export default Spinner
