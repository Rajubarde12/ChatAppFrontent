import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';

const AttachmentModal = ({
  visible = false,
  onClose = () => {},
  onSelect = () => {},
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: 'image' | 'video' | 'file') => void;
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.headerLine} />

          <Text style={styles.title}>Attach a file</Text>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[styles.optionCard, { backgroundColor: '#E8F5E9' }]}
              onPress={() => onSelect('image')}>
              <Text style={[styles.icon, { color: '#4CAF50' }]}>🖼️</Text>
              <Text style={styles.optionLabel}>Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, { backgroundColor: '#E3F2FD' }]}
              onPress={() => onSelect('video')}>
              <Text style={[styles.icon, { color: '#2196F3' }]}>🎬</Text>
              <Text style={styles.optionLabel}>Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, { backgroundColor: '#FFF3E0' }]}
              onPress={() => onSelect('file')}>
              <Text style={[styles.icon, { color: '#FB8C00' }]}>📄</Text>
              <Text style={styles.optionLabel}>Document</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 25,
  },
  headerLine: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 3,
    marginBottom: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  optionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 32,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    color: '#333',
  },
  cancelBtn: {
    marginTop: 15,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#E53935',
    fontWeight: '600',
  },
});

export default AttachmentModal;
