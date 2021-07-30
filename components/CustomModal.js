import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

const CustomModal = (props) => {

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
       <Portal>
        <Modal visible={props.visible} onDismiss={props.hideHandler} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
       </Portal>
      <Button style={{marginTop: 30}}>
        Show
      </Button>
    </Provider>
  );
};

export default CustomModal;