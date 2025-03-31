import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import ChatBot from './LawBot'; 

const ChatModal = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ChatBot />
        </View>
        <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }}
        onPress={onClose}>
        <View style={{ padding: 10, backgroundColor: 'blue', borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Close Chat</Text>
        </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ChatModal;
