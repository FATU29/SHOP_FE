import { Box, BoxProps, FormHelperText, InputLabel, styled } from "@mui/material";
import { NextPage } from "next";
import React, { useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import IconifyIcon from "../Icon";
import { useTranslation } from "react-i18next";



interface TCustomDatePicker extends ReactDatePickerProps {
    selectedDate?: Date | null,
    typeDateText: string,
    error: string | undefined
}

const StyledDatePicker = styled(Box)<BoxProps>(({ theme }) => {
    return (
        {
            borderRadius: 8,
            width: "100%",
            height: "38px",
            backgroundColor:
                theme.palette.mode === "dark"
                    ? theme.palette.background.default // Background khi ở chế độ dark
                    : theme.palette.grey[200], // Background khi ở chế độ light
            border: `1px solid rgba(${theme.palette.customColors.main},0.2)`,
            transition: theme.transitions.create(["border-color", "box-shadow"], {
                duration: theme.transitions.duration.shorter,
            }),
            position: "relative",
            ".react-datepicker-popper": {
                ".react-datepicker": {
                    backgroundColor:
                        theme.palette.mode === "dark"
                            ? theme.palette.background.default // Background khi ở chế độ dark
                            : theme.palette.grey[200], // Background khi ở chế độ light
                    ".react-datepicker__month-container": {
                        borderRadius: "10px",
                        ".react-datepicker__month": {
                            ".react-datepicker__week": {
                                ".react-datepicker__day": {
                                    color: theme.palette.text.secondary,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.mode === "dark"
                                                ? theme.palette.grey[300] : theme.palette.background.default,
                                        color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.dark
                                    },
                                }
                            },
                            ".react-datepicker__day--disabled": {
                                backgroundColor:theme.palette.grey[400],
                                color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.dark,
                            }
                        },
                        ".react-datepicker__header": {
                            ".react-datepicker__current-month": {
                                color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.dark,
                            },
                            ".react-datepicker__day-names": {
                                ".react-datepicker__day-name": {
                                    color: theme.palette.text.secondary,
                                }
                            }
                        }
                    }
                }
            },
            ".react-datepicker-wrapper": {
                width: "100%",
                height: "100%",
                ".react-datepicker__input-container": {
                    width: "100%",
                    height: "100%",
                    "input": {
                        borderRadius: 8,
                        border: "none",
                        outline: "none",
                        width: "100%",
                        height: "100%",
                        backgroundColor:
                            theme.palette.mode === "dark"
                                ? theme.palette.background.default
                                : theme.palette.grey[200],
                        padding: "15px",
                        color: theme.palette.text.secondary
                    }
                },
            }

        }
    )
})






export const CustomDatePicker: NextPage<TCustomDatePicker> = (props: TCustomDatePicker) => {

    const { selectedDate, onChange, typeDateText, error, ...rest } = props
    const { t } = useTranslation();

    console.log("error", error)


    return (
        <>
            <StyledDatePicker>
                <InputLabel sx={{
                    display: "block",
                    position: "absolute",
                    top: "-22px"
                }}>
                    {t("Date")}
                </InputLabel>
                <DatePicker placeholderText="Enter Date" selected={selectedDate} onChange={onChange} {...rest} />
                <IconifyIcon style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    fontSize: "20px",
                }}
                    icon={"uiw:date"}></IconifyIcon>
                {error && (
                    <>
                        <FormHelperText>
                            {error}
                        </FormHelperText>
                    </>
                )}
            </StyledDatePicker>
        </>
    )
}

export default CustomDatePicker;