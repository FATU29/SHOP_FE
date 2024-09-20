import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactDraftWysiwyg from "./react-draft-wysiwyg";
import { Box, InputLabel, styled } from "@mui/material";
import { BoxProps } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { EditorProps } from "react-draft-wysiwyg";



interface TCustomEditor extends EditorProps {
    label:string
}

const StyledBox = styled(Box)<BoxProps>(({ theme }) => {
    return {
        position:"relative",
        ".rdw-editor-wrapper":{
            borderRadius: 8,
            backgroundColor:
                theme.palette.mode === "dark"
                    ? theme.palette.background.default // Background khi ở chế độ dark
                    : theme.palette.grey[200], // Background khi ở chế độ light
            border: `1px solid rgba(${theme.palette.customColors.main},0.2)`,
            transition: theme.transitions.create(["border-color", "box-shadow"], {
                duration: theme.transitions.duration.shorter,
            }),
            ".rdw-editor-toolbar":{
                border:"none"
            },
            ".rdw-editor-main":{
                padding:"8px",
                border: `1px solid rgba(${theme.palette.customColors.main},0.2)`,
                minHeight:"120px",
                overflow:"auto"
            }
        }
    }
})

export const CustomEditor = (props: TCustomEditor) => {

    const { editorState, onEditorStateChange ,label, ...rests} = props

  
    return (
        <>

            <StyledBox>
                <InputLabel sx={{
                    position:"absolute",
                    top:"-21px",
                    fontSize:"15px",
                    display:"block"
                }}>
                    {label}
                </InputLabel>
                <ReactDraftWysiwyg
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    {...rests}
                />
            </StyledBox>
        </>
    )
}

export default CustomEditor;