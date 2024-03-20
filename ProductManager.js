const fs  = require('fs');
class ProductManager{
    #products
    #path
    static id_products = 0;
    constructor(){
        this.#products = this.#lecturaProductos();
        this.#path = "./productos.json"
    }

    #asignarId(){
        let ir = 1;
        if (this.#products.length != 0){
            id = this.#products[this.#products.length - 1].id + 1;
        }
        return id;      
    }

    #lecturaProductos(){
        try {
            if(fs.existsSync(this.path))
                return JSON.parse(fs.readFileSync(this.#path , {encoding: "utf-8"}));
            
            return []
        } catch (error) {
            console.log("hubo un error en la lectura del archivo");
        }
    }
    
    #guardarArchivo(){
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        } catch (error) {
            console.log("hubo un error en el guardado del archivo");
        }
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
            this.#guardarArchivo();

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
    updateProduct(id , objetoUpdate){
        let msg = `el producto con el id ${id} no existe`

        const index = this.#products.findIndex(p=> p.id === id)

        if(index !== -1){
            const {id, ...rest} = objetoUpdate
            this.#products[index] = {...this.#products[index] , ...rest};
            this.#guardarArchivo();
            msg = "el producto fue actualizado"
        }
    }
    deleteProduct(id){
        let msg = `el producto con id ${id} no existe`

        const index = this.#products.findIndex(p => p.id === id);
        if(index !== -1){
            this.#products = this.#products.filter(p=> p.id !== id);
            this.#guardarArchivo();
            msg = "el producto fue eliminado"
        }
        return msg;
    }
}

module.exports = ProductManager;