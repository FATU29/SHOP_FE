import { TextFieldProps, TextField, styled, useTheme } from "@mui/material";

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
    return {
        width: "100%", //.MuiFormControl-root .MuiTextField-root

        ".MuiInputLabel-root": {
            transform: "none",
            lineHeight: 1.2,
            position: "relative",
            marginBottom: theme.spacing(1),
            fontSize: theme.typography.body2.fontSize,
        },
        ".MuiInputBase-root": {
            borderRadius: 8,
            width: "100%",
            backgroundColor:
                theme.palette.mode === "dark"
                    ? theme.palette.background.paper // Background khi ở chế độ dark
                    : theme.palette.grey[100], // Background khi ở chế độ light
            border: `1px solid rgba(${theme.palette.customColors.main},0.2)`,
            transition: theme.transitions.create(["border-color", "box-shadow"], {
                duration: theme.transitions.duration.shorter,
            }),
            "&:before": {
                display: "none",
            },
            ".MuiInputBase-input": {
                padding: "12px 16px",
                width: "100%",
            },
        },
        ".MuiFormHelperText-root": {
            marginLeft: 0,
        },
    };
});

const CustomTextField = (props: TextFieldProps) => {
    const theme = useTheme(); // Lấy theme ở đây để có thể điều chỉnh theo chế độ dark/light
    const { size = "small", variant = "standard", InputLabelProps, ...rests } = props;
    return (
        <TextFieldStyled
            size={size}
            variant={variant}
            InputLabelProps={{ ...InputLabelProps, shrink: true }}
            {...rests}
        />
    );
};

export default CustomTextField;
