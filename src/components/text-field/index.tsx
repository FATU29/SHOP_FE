import { TextFieldProps, TextField, styled } from "@mui/material";

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
                    ? theme.palette.background.default // Background khi ở chế độ dark
                    : theme.palette.grey[200], // Background khi ở chế độ light
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
                color:
                    theme.palette.mode === "dark"
                        ? theme.palette.text.primary // Màu chữ khi ở chế độ dark
                        : theme.palette.text.secondary, // Màu chữ khi ở chế độ light
            },
        },
        ".MuiFormHelperText-root": {
            marginLeft: 0,
            color:
                theme.palette.mode === "dark"
                    ? theme.palette.text.secondary // Màu thông báo khi ở chế độ dark
                    : theme.palette.text.primary, // Màu thông báo khi ở chế độ light
        },
    };
});

const CustomTextField = (props: TextFieldProps) => {
    const { size = "small", variant = "filled", InputLabelProps, ...rests } = props;
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
