import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Node, Edge } from 'react-flow-renderer';

type ModalComponentProps = {
  title: string;
  nodeContest: Node[];
  edgeContest: Edge[];
  handleClose: () => void;
  isOpen: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '800px',
  overflowX: 'auto'
};

export function ModalComponent({ title, nodeContest, edgeContest, handleClose, isOpen }: ModalComponentProps) {

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

            <Box sx={{ mt: 2, fontSize: '1.2rem' }}>
              <b>Cards</b>
              <pre>{JSON.stringify(nodeContest, null, 2)}</pre>
            </Box>

            <Box sx={{ mt: 2, pl: 10, fontSize: '1.2rem' }}>
              <b>Ligaçao</b>
              <pre>{JSON.stringify(edgeContest, null, 2)}</pre>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}