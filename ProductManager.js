class ProductManager{
    #products
    static id_products = 0;
    constructor(){
        this.#products = []        
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock)
            console.log("se necesitan que esten completos los siguientes parametros: title, description, price, thumbnail, code, stock");
                       
        const code2 = this.#products.find(p=> p.code == code);

        if(code2)
            return "esta repetido el código"
            
            const id = ProductManager.id_products + 1;
            
            const Producto_nuevo = {
                id :id,
                title:title,
                description:description,
                price:price,
                thumbnail:thumbnail,
                code:code,
                stock:stock
            };
            this.#products.push(Producto_nuevo);
            return "producto nuevo agreado"
    }

    getProducts(){
        return this.#products
    }
    getProductById(id){
        product = this.#products.find(p => p.id == id);
        if(product){
            return "found"
        }
        else{
            return "not found"
        }
    }
}

module.exports = ProductManager;