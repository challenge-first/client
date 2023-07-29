import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Camera } from '../../assets/camera.svg'
import { ReactComponent as Update } from '../../assets/update.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { styled } from 'styled-components'

function EditorList({ postId, onImageChange, onContentChange, editorList, setEditorList }) {
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [onDrag, setOnDrag] = useState(false);
    const [paddingBottom, setPaddingBottom] = useState(null);

    const fileInputRef = useRef(null);
    const contentRef = useRef(null);

    // 수정일 때 기존 사진, 내용을 editorList에 넣기
    useEffect(() => {
        const initialImage = editorList.find(item => item.id === postId)?.image || "";
        const initialContent = editorList.find(item => item.id === postId)?.content || "";
        setImage(initialImage);
        setContent(initialContent);
        // const temp = convertURLtoFile(initialImage);
        // console.log(temp);
    }, [postId]);

    const convertURLtoFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
        const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
        const metadata = { type: `image/${ext}` };
        return new File([data], !filename, metadata);
    };

    // 숨겨진 파일 업로드 input을 클릭하는 역할
    const handleUploadButton = () => {
        fileInputRef.current.click();
    }

    // 버튼을 클릭했을 때 사진 업로드 처리
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
            onImageChange(postId, file);
        }
    }

    // 사진을 Drag&Drop 할 때 사진 업로드 처리
    const handleDrop = (e) => {
        e.preventDefault();
        setOnDrag(false);
        const file = e.dataTransfer.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
            onImageChange(postId, file);
        };
    }

    // 높이를 이미지에 맞게 조절
    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            setPaddingBottom((img.height / img.width) * 100);
        };
    }, [image]);

    // 사진을 Drag&Drop 할 때 테두리 효과
    const handleDrag = (e, isDragging) => {
        e.preventDefault();
        setOnDrag(isDragging);
    };

    // textarea 높이 자동 변경
    const handleResizeTextarea = () => {
        contentRef.current.style.height = "auto";
        contentRef.current.style.height = (contentRef.current.scrollHeight + 2) + 'px';
    }

    // textarea 내용 입력 처리
    const handleContentChange = () => {
        handleResizeTextarea();
        setContent(contentRef.current.value);
        onContentChange(postId, contentRef.current.value);
    }

    // 사진 삭제
    const handleDeleteButton = () => {
        setEditorList(list => list.filter(item => item.id !== postId));
        onImageChange(postId, null);
        setImage("");
        setContent("");
        setPaddingBottom(null);
        onContentChange(postId, "");
    };

    return (
        <>
            <StFormList>
                <StImageArea>
                    <StImageAreaItem>
                        {
                            (!image) ? (
                                <StImage>
                                    <StImageInput
                                        onDrop={handleDrop}
                                        onDragEnter={(e) => handleDrag(e, true)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDragLeave={(e) => handleDrag(e, false)}
                                        $onDrag={onDrag}
                                    >
                                        <StSpan>
                                            <Camera />
                                        </StSpan>
                                        <StSpan $size={"16px"} $height={"20px"} $weight={"700"}>
                                            사진을 끌어다 놓으세요
                                        </StSpan>
                                        <StButton onClick={handleUploadButton}>PC에서 불러오기</StButton>
                                    </StImageInput>
                                </StImage>
                            ) : (
                                <StImage $bottom={`${paddingBottom}%`}>
                                    <StUploadImage src={image ? image : "null"} alt="" />
                                    <StImageButtonArea>
                                        <ImageButton onClick={handleUploadButton}>
                                            <Update />
                                        </ImageButton>
                                        <ImageButton onClick={handleDeleteButton}>
                                            <Delete />
                                        </ImageButton>
                                    </StImageButtonArea>
                                </StImage>)
                        }
                        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImage} aria-label='사진 업로드' />
                    </StImageAreaItem>
                </StImageArea>
                <StContentArea>
                    <StContent>
                        <StContentInput
                            ref={contentRef}
                            spellCheck="false"
                            placeholder={`어떤 사진인지 짧은 소개로 시작해보세요.`}
                            value={content}
                            onChange={handleContentChange}
                        />
                    </StContent>
                </StContentArea>
            </StFormList>
        </>
    )
}

export default EditorList

const StFormList = styled.div`
    display: flex;
    margin: 0 -12px;
`

const StImageArea = styled.div`
    flex: 1 0 0px;
    margin: 0px 0px 12px;
`

const StImageAreaItem = styled.div`
    width: 100%;
    position: relative;
    border-radius: 4px;
`

const StUploadImage = styled.img`
    position: absolute;
    display: block;
    top: 0px;
    right: 0px;
    width: 100%;
    border-radius: 4px;
`

const StImageButtonArea = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    box-sizing: border-box;
    padding: 40px 16px 16px;
    border-radius: inherit;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.54));
    color: rgb(255, 255, 255);
    font-size: 0px;
    line-height: 0;
    transition: opacity 0.1s ease 0s;
    opacity: 0;
`

const ImageButton = styled.button`
    display: inline-block;
    position: relative;
    padding: 0px;
    margin: 0px;
    margin-right: 24px;
    border: none;
    background: none;
    transition: opacity 0.1s ease 0s;
    cursor: pointer;

    &:hover {
        opacity: 0.6
    }
`

const StImage = styled.div`
    width: 100%;
    padding-bottom: ${({ $bottom }) => $bottom ? $bottom : "100%"};
    background-color: #F7F8FA;
    border-radius: 4px;
    position: relative;
    
    &:hover ${StImageButtonArea} {
        opacity: 1;
    }
`

const StImageInput = styled.div`
    background-color: #F7F9FA;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    gap: 10px;
    border: ${({ $onDrag }) => $onDrag ? "5px solid #35C5F0" : ""};

    & > span,
    & > button {
        pointer-events: ${({ $onDrag }) => $onDrag ? "none" : "auto"};
    }
`

const StContentArea = styled.div`
    flex: 1.2 0 0px;
    margin: 0 12px;
`

const StContent = styled.div`
    position: relative;
`

const StContentInput = styled.textarea`
    display: inline-block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    
    color: #424242;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-line;
    overflow-wrap: break-word;
    caret-color: #2F3438;
    
    border: 1px solid #DADDE0;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    resize: none;

    height: auto;
    min-height: 152px;
    padding: 16px;
    
    &::placeholder {
        color: #C2C8CC;
    }
`

const StSpan = styled.span`
    font-size: ${({ $size }) => $size};
    line-height: ${({ $height }) => $height};
    font-weight: ${({ $weight }) => $weight};
    color: #828C94;
`

const StButton = styled.button`
    width: ${({ $width }) => $width};
    height: 44px;
    font-size: 14px;
    line-height: 18px;
    border-radius: 4px;
    text-align: center;
    background-color: #35C5F0;
    color: #FFFFFF;
    padding: 0 16px;
    cursor: pointer;

    &:hover {
        background-color: #009FCE;
    }
`