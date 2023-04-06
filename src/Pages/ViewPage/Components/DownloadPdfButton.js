import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { FaFilePdf } from "react-icons/fa";
import { css } from "@emotion/react";

function DownloadPdfButton(props) {
  return (
    <Button
      
      bg="blue.500"
      color="white"
      size="md"
      onClick={props.onDownload}
      _hover={{ bg: "blue.600" }}
      css={css`
        border-radius: 999px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      `}
      leftIcon={<FaFilePdf />}
    >
     <Text> PDF</Text>
    </Button>
  );
}

export default DownloadPdfButton;
