// ** MUI Imports

import { Box, Button, IconButton, styled, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import IconifyIcon from "../Icon";



const StyledTableHeader = styled(Box)(({ theme }) => {
  return {
    "borderRadius": "15px",
    "border": `1px solid ${theme.palette.primary.main}`,
    "padding": "8px 10px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between"
  }
})


type TTableHeader = {
  numRow: number,
  onClear: () => void,
  actions: { label: string, value: string, disabled: boolean }[],
  handleAction: (type: string) => void
}


const TableHeader = (props: TTableHeader) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const { numRow, onClear, actions, handleAction } = props

  return (
    <>
      <StyledTableHeader>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px"
        }}>
          <Typography>{t("Selected")}</Typography>
          <Typography sx={{
            backgroundColor: `${theme.palette.primary.main}`,
            height: "20x",
            width: "20px",
            textAlign: "center",
            borderRadius: "50%",
            color: theme.palette.common.white,
            fontSize: "14px"
          }}><span>
              {numRow}
            </span></Typography>
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px"
        }}>
          {actions?.map((action) => {
            return (
              <>
                <Button
                  disabled={action.disabled}
                  onClick={() => {
                  handleAction(action.value)
                }} variant="contained" key={action.value}>{action.label}</Button>
              </>
            )
          })}
          <IconButton onClick={() => {
            onClear();
          }}>
            <IconifyIcon fontSize={"2rem"} icon={"carbon:close-outline"}></IconifyIcon>
          </IconButton>
        </Box>
      </StyledTableHeader>
    </>
  )
}

export default TableHeader
