import { StyleSheet, Dimensions } from "react-native";

const PURPLE_THEME = 'rgba(130, 87, 254, 1.00)';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        marginBottom: 20,
    },
    goBackButton: {
        backgroundColor: PURPLE_THEME,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    goBackButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // Image Gallery Styles - Updated for responsiveness
    imageContainer: {
        height: windowHeight * 0.4,
        width: '100%',
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    mainImage: {
        width: windowWidth * 0.85,
        height: windowWidth * 0.85 * 0.8, // Maintain aspect ratio
        borderRadius: 12,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
        position: 'absolute',
        bottom: 70,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: PURPLE_THEME,
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    thumbnailScroll: {
        width: '100%',
        position: 'absolute',
        bottom: 10,
        maxHeight: 70,
    },
    thumbnailContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnailTouch: {
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 6,
        backgroundColor: 'white',
    },
    thumbnailActive: {
        borderColor: PURPLE_THEME,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 6,
    },
    // Content Styles
    contentScroll: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    productTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        flex: 3,
        color: '#333',
    },
    productPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: PURPLE_THEME,
        flex: 1,
        textAlign: 'right',
    },
    // Styles pour les bulles d'information
    infoContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    infoBubble: {
        backgroundColor: '#f0ebff',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e6dbff',
    },
    infoBubbleText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    vendorInfo: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fcfcfc',
    },
    vendorText: {
        fontSize: 15,
        color: '#555',
        fontWeight: '500',
    },
    // Styles pour la description (seul élément en Collapsible)
    collapsible: {
        marginVertical: 15,
    },
    collapsibleContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        lineHeight: 22,
        color: '#444',
    },
    buyButton: {
        backgroundColor: PURPLE_THEME,
        marginHorizontal: 20,
        marginVertical: 25,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    soldButton: {
        backgroundColor: '#aaa',
    },
    buyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // Modal Styles - Improved for responsiveness
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        width: windowWidth > 600 ? '80%' : '95%',
        maxHeight: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        color: PURPLE_THEME,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#444',
    },
    // Responsive layout adjustments for the modal content
    contentContainer: {
        flexDirection: windowWidth > 600 ? 'row' : 'column',
        marginTop: 20,
    },
    productsListContainer: {
        flex: 1,
        borderRightWidth: windowWidth > 600 ? 1 : 0,
        borderBottomWidth: windowWidth > 600 ? 0 : 1,
        borderRightColor: '#eee',
        borderBottomColor: '#eee',
        paddingRight: windowWidth > 600 ? 15 : 0,
        paddingBottom: windowWidth > 600 ? 0 : 15,
        maxHeight: windowWidth > 600 ? 450 : 250,
    },
    cartContainer: {
        flex: 1,
        paddingLeft: windowWidth > 600 ? 15 : 0,
        paddingTop: windowWidth > 600 ? 0 : 15,
        maxHeight: windowWidth > 600 ? 450 : 300,
    },
    cartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        color: PURPLE_THEME,
    },
    emptyCartText: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 30,
        marginBottom: 30,
        color: '#888',
        fontSize: 15,
    },
    productItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    productDetails: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 13,
        color: '#666',
        marginVertical: 5,
        lineHeight: 18,
    },
    addButton: {
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
    },
    cartItemName: {
        flex: 2,
        fontSize: 15,
        color: '#333',
    },
    cartItemPrice: {
        flex: 1,
        textAlign: 'right',
        fontWeight: '600',
        color: PURPLE_THEME,
        fontSize: 15,
    },
    removeButton: {
        backgroundColor: '#dc3545',
        padding: 6,
        borderRadius: 6,
        marginLeft: 10,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    cartSummary: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    subtotalText: {
        fontSize: 15,
        marginBottom: 6,
        color: '#444',
    },
    discountContainer: {
        marginVertical: 8,
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: PURPLE_THEME,
    },
    discountText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    discountInfoText: {
        fontSize: 13,
        fontStyle: 'italic',
        marginTop: 3,
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 12,
        color: PURPLE_THEME,
    },
    checkoutButton: {
        backgroundColor: PURPLE_THEME,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    checkoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#6c757d',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        right: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        borderRadius: 20,
        zIndex: 10,
    },
    backButtonText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: '500',
        color : 'rgba(0, 0, 0, 0.5)',
    }
});