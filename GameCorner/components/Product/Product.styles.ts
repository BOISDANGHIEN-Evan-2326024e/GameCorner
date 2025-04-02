import { StyleSheet, Dimensions } from "react-native";

const COLORS = {
    primary: '#6A42F4',
    primaryLight: '#f0ebff',
    primaryBorder: '#e6dbff',
    secondary: '#FF4757',
    text: '#333333',
    textLight: '#666666',
    background: '#f9f9f9',
    card: '#FFFFFF',
    border: '#e0e0e0',
    success: '#28a745',
    danger: '#dc3545',
    gray: '#aaaaaa',
    disabled: '#cccccc',
    shadow: 'rgba(0, 0, 0, 0.2)'
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const isTablet = windowWidth > 600;

export const styles = StyleSheet.create({
    // Main container
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    
    // Error handling
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    errorText: {
        fontSize: 18,
        marginBottom: 24,
        color: COLORS.text,
        textAlign: 'center',
    },
    goBackButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    goBackButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    
    // Image Gallery - Enhanced for better viewing
    imageContainer: {
        height: windowHeight * 0.4,
        width: '100%',
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    mainImage: {
        width: windowWidth * 0.85,
        height: windowWidth * 0.85 * 0.8,
        borderRadius: 16,
        backgroundColor: COLORS.card,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
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
        backgroundColor: COLORS.border,
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: COLORS.primary,
        width: 12,
        height: 12,
        borderRadius: 6,
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
        borderRadius: 10,
        backgroundColor: COLORS.card,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    thumbnailActive: {
        borderColor: COLORS.primary,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    
    // Content Styles - Improved clarity
    contentScroll: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.card,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 3,
        color: COLORS.text,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        flex: 1,
        textAlign: 'right',
    },
    
    // Info bubbles - More cohesive appearance
    infoContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
        backgroundColor: COLORS.card,
    },
    infoBubble: {
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.primaryBorder,
        elevation: 1,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    infoBubbleText: {
        fontSize: 14,
        color: COLORS.text,
        fontWeight: '600',
    },
    
    // Vendor section - Better visibility
    vendorInfo: {
        marginTop: 8,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.card,
    },
    vendorText: {
        fontSize: 16,
        color: COLORS.textLight,
        fontWeight: '500',
    },
    
    // Description section - Fixed to work with component
    collapsible: {
        marginVertical: 15,
        backgroundColor: COLORS.card,
        borderRadius: 10,
        marginHorizontal: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    collapsibleContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        lineHeight: 24,
        fontSize: 15,
        backgroundColor: COLORS.card,
        color: COLORS.textLight,
    },
    
    // Buy button - More prominent
    buyButton: {
        backgroundColor: COLORS.primary,
        marginHorizontal: 24,
        marginVertical: 25,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    soldButton: {
        backgroundColor: COLORS.gray,
    },
    buyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    
    // Modal styles - Enhanced for scrolling on mobile
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        margin: 0, // Important pour couvrir tout l'écran
        padding: 0, // Pas de padding qui réduirait l'espace
    },
    modalContent: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 15, // Padding réduit sur mobile
        width: isTablet ? '80%' : '92%',
        height: isTablet ? '90%' : '80%', // Hauteur fixe au lieu de maxHeight
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
    },
    modalScrollView: {
        flex: 1,
    },
    modalTitle: {
        fontSize: isTablet ? 22 : 18, // Taille réduite sur mobile
        fontWeight: 'bold',
        marginBottom: 12, // Marge réduite
        textAlign: 'center',
        color: COLORS.primary,
    },
    modalText: {
        fontSize: isTablet ? 16 : 14, // Taille réduite sur mobile
        marginBottom: 8, // Marge réduite
        color: COLORS.textLight,
        lineHeight: 20,
    },
    
    // Responsive layout - Completely redesigned for small screens
    contentContainer: {
        flexDirection: isTablet ? 'row' : 'column',
        marginTop: isTablet ? 20 : 10, // Marge réduite sur mobile
    },
    productsListContainer: {
        flex: 1,
        borderRightWidth: isTablet ? 1 : 0,
        borderBottomWidth: isTablet ? 0 : 1,
        borderColor: COLORS.border,
        paddingRight: isTablet ? 15 : 0,
        paddingBottom: isTablet ? 0 : 10,
        height: isTablet ? 450 : windowHeight * 0.23, // Hauteur proportionnelle à l'écran
    },
    cartContainer: {
        flex: 1,
        paddingLeft: isTablet ? 15 : 0,
        paddingTop: isTablet ? 0 : 10,
        height: isTablet ? 450 : windowHeight * 0.23, // Hauteur proportionnelle à l'écran
    },
    cartTitle: {
        fontSize: isTablet ? 18 : 16, // Taille réduite sur mobile
        fontWeight: 'bold',
        marginBottom: isTablet ? 16 : 8, // Marge réduite
        textAlign: 'center',
        color: COLORS.primary,
    },
    emptyCartText: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: isTablet ? 30 : 15, // Marge réduite
        marginBottom: isTablet ? 30 : 15, // Marge réduite
        color: COLORS.textLight,
        fontSize: isTablet ? 15 : 14, // Taille réduite
    },
    
    // Product items in modal - Taille réduite pour mobile
    productItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingVertical: isTablet ? 14 : 8, // Padding réduit
        paddingHorizontal: isTablet ? 8 : 4, // Padding réduit
    },
    productImage: {
        width: isTablet ? 90 : 70, // Taille réduite
        height: isTablet ? 90 : 70, // Taille réduite
        borderRadius: 8,
        backgroundColor: COLORS.background,
    },
    productDetails: {
        flex: 1,
        marginLeft: isTablet ? 16 : 10, // Marge réduite
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: isTablet ? 16 : 14, // Taille réduite
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: isTablet ? 6 : 4, // Marge réduite
    },
    productDescription: {
        fontSize: isTablet ? 14 : 12, // Taille réduite
        color: COLORS.textLight,
        marginVertical: isTablet ? 5 : 3, // Marge réduite
        lineHeight: isTablet ? 20 : 16, // Hauteur de ligne réduite
    },
    addButton: {
        backgroundColor: COLORS.success,
        padding: isTablet ? 10 : 6, // Padding réduit
        borderRadius: 8,
        alignItems: 'center',
        marginTop: isTablet ? 5 : 3, // Marge réduite
    },
    addButtonText: {
        color: 'white',
        fontSize: isTablet ? 14 : 12, // Taille réduite
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: COLORS.disabled,
    },
    
    // Cart items styling - Plus compact sur mobile
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingVertical: isTablet ? 14 : 8, // Padding réduit
    },
    cartItemName: {
        flex: 2,
        fontSize: isTablet ? 15 : 13, // Taille réduite
        color: COLORS.text,
    },
    cartItemPrice: {
        flex: 1,
        textAlign: 'right',
        fontWeight: '600',
        color: COLORS.primary,
        fontSize: isTablet ? 16 : 14, // Taille réduite
    },
    removeButton: {
        backgroundColor: COLORS.danger,
        padding: isTablet ? 8 : 6, // Padding réduit
        borderRadius: 8,
        marginLeft: isTablet ? 10 : 6, // Marge réduite
    },
    removeButtonText: {
        color: 'white',
        fontSize: isTablet ? 13 : 11, // Taille réduite
        fontWeight: '600',
    },
    
    // Cart summary - Plus compact sur mobile
    cartSummary: {
        marginTop: isTablet ? 20 : 10, // Marge réduite
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: isTablet ? 15 : 10, // Padding réduit
    },
    subtotalText: {
        fontSize: isTablet ? 16 : 14, // Taille réduite
        marginBottom: isTablet ? 8 : 4, // Marge réduite
        color: COLORS.text,
    },
    discountContainer: {
        marginVertical: isTablet ? 10 : 6, // Marge réduite
        padding: isTablet ? 12 : 8, // Padding réduit
        backgroundColor: COLORS.primaryLight,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    discountText: {
        fontWeight: 'bold',
        fontSize: isTablet ? 16 : 14, // Taille réduite
        color: COLORS.text,
    },
    discountInfoText: {
        fontSize: isTablet ? 14 : 12, // Taille réduite
        fontStyle: 'italic',
        marginTop: isTablet ? 4 : 2, // Marge réduite
        color: COLORS.textLight,
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: isTablet ? 20 : 16, // Taille réduite
        marginVertical: isTablet ? 14 : 8, // Marge réduite
        color: COLORS.primary,
    },
    
    // Buttons - Plus petits mais toujours accessibles sur mobile
    checkoutButton: {
        backgroundColor: COLORS.primary,
        padding: isTablet ? 16 : 12, // Padding réduit
        borderRadius: 12,
        alignItems: 'center',
        marginTop: isTablet ? 12 : 8, // Marge réduite
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    checkoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: isTablet ? 18 : 15, // Taille réduite
    },
    closeButton: {
        backgroundColor: COLORS.gray,
        padding: isTablet ? 14 : 10, // Padding réduit
        borderRadius: 12,
        alignItems: 'center',
        marginTop: isTablet ? 20 : 12, // Marge réduite
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14, // Taille réduite
    },
    
    // Navigation
    backButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 25,
        zIndex: 10,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    backButtonText: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    }
});