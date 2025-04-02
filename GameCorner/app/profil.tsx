import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Button, 
  Text, 
  TouchableOpacity, 
  Image, 
  TextInput,
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { User } from '@/Class/User';

export default function ProfilScreen({ setPage, UserData, produits }: { setPage: (page: string) => void, UserData: any, produits : any }) {
  // État pour le mode édition
  const [isEditing, setIsEditing] = useState(false);
  
  // États pour les données modifiables
  const [email, setEmail] = useState(UserData?.email || '');
  const [prenom, setPrenom] = useState(UserData?.prenom || '');
  const [nom, setNom] = useState(UserData?.nom || '');
  const [image, setImage] = useState(UserData?.image_profil || '');
  
  // Récupération des produits de l'utilisateur
  const userProducts = produits.filter(
    (product: { marchand: any; }) => product.marchand === UserData?.id
  );
  
  // Fonction pour sauvegarder les modifications
  const saveChanges = () => {
    if (UserData) {
      UserData.email = email;
      UserData.prenom = prenom;
      UserData.nom = nom;
      UserData.image_profil = image;
    }
    setIsEditing(false);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setPage("accueil")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Profil</ThemedText>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Ionicons name={isEditing ? "save-outline" : "create-outline"} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: UserData?.image_profil }} 
            style={styles.profileImage} 
          />
          
          {isEditing ? (
            <View style={styles.editContainer}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Email</ThemedText>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Prénom</ThemedText>
                <TextInput
                  style={styles.input}
                  value={prenom}
                  onChangeText={setPrenom}
                  placeholder="Prénom"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nom</ThemedText>
                <TextInput
                  style={styles.input}
                  value={nom}
                  onChangeText={setNom}
                  placeholder="Nom"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>URL de l'image de profil</ThemedText>
                <TextInput
                  style={styles.input}
                  value={image}
                  onChangeText={setImage}
                  placeholder="URL de l'image"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={saveChanges}
              >
                <Text style={styles.saveButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.infoContainer}>
              <ThemedText style={styles.userName}>{UserData?.prenom} {UserData?.nom}</ThemedText>
              <ThemedText style={styles.userEmail}>{UserData?.email}</ThemedText>
              <ThemedText style={styles.userStat}>Articles mis en vente: {userProducts.length}</ThemedText>
              <ThemedText style={styles.userStat}>Articles vendus: {userProducts.filter((p: { vendu: any; }) => p.vendu).length}</ThemedText>
            </View>
          )}
        </View>

        <View style={styles.divider} />
        
        <View style={styles.productsSection}>
          <ThemedText style={styles.sectionTitle}>Mes articles en vente</ThemedText>
          
          {userProducts.length === 0 ? (
            <ThemedText style={styles.emptyMessage}>Vous n'avez pas encore mis d'articles en vente</ThemedText>
          ) : (
            <FlatList
              data={userProducts}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.productCard}
                  onPress={() => {/* Navigation vers la page du produit */}}
                >
                  <Image 
                    source={{ uri: item.photo[0] }} 
                    style={styles.productImage} 
                  />
                  <View style={styles.productInfo}>
                    <ThemedText style={styles.productName}>{item.name}</ThemedText>
                    <ThemedText style={styles.productPrice}>{item.prix} €</ThemedText>
                    <View style={[
                      styles.statusBadge, 
                      item.vendu ? styles.soldBadge : styles.availableBadge
                    ]}>
                      <Text style={styles.statusText}>
                        {item.vendu ? 'Vendu' : 'En vente'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6A42F4',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#6A42F4',
  },
  infoContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  userStat: {
    fontSize: 14,
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  editContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6A42F4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emptyMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#999',
    marginTop: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statusBadge: {
    position: 'absolute',
    right: 10,
    top: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  soldBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
  },
  availableBadge: {
    backgroundColor: 'rgba(46, 125, 50, 0.8)',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
});