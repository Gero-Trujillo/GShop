var carritoVisible = false;

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    var botonesEliminarItem = document.getElementsByClassName('btnEliminar');
    for(var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    var botonesSumarCantidad = document.getElementsByClassName('sumQuantity');
    for(var i=0; i<botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('restQuantity');
    for(var i=0; i<botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    var botonesAgregarAlCarrito = document.getElementsByClassName('btnItem');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    document.getElementsByClassName('btnPay')[0].addEventListener('click',pagarClicked)
}

function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();


    actulaizarTotalCarrito();

    ocultarCarrito();
}

function actulaizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('cart')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('itemCart');
    var total = 0;

    for(var i=0; i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('cartItemPrice')[0];
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ','))
        var cantidadItem = item.getElementsByClassName('cartQuantity')[0];
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('totalPriceCart')[0].innerText = '$'+total.toLocaleString("es") + ',00';
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('itemsCart')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('cart')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity='0';
        carritoVisible = false;

        var items = document.getElementsByClassName('containerItems')[0];
        items.style.width = '100%';
    }
}

function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('cartQuantity')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('cartQuantity')[0].value = cantidadActual;

    actulaizarTotalCarrito();
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('cartQuantity')[0].value;
    cantidadActual--;

    if(cantidadActual >= 1){
        selector.getElementsByClassName('cartQuantity')[0].value = cantidadActual;
        actulaizarTotalCarrito();
    }  
}

function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('tittleItem')[0].innerText;
    var precio = item.getElementsByClassName('priceItem')[0].innerText;
    var imageSrc = item.getElementsByClassName('imgItem')[0].src;


    agregarItemAlCarrito(titulo, precio, imageSrc);
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imageSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('itemsCart')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('cartItemTittle');
    for(var i=0; i<nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito")
            return;
        }
    }

    var itemCarritoContenido = `
    <div class="itemCart">
        <img src="${imageSrc}" alt="" class="imgItemCart" width="80px">
        <div class="cartItemDetails">
            <span class="cartItemTittle">${titulo}</span>
            <div class="selectQuantity">
                <i class="fa-solid fa-minus restQuantity"></i>
                <input type="text" value="1" class="cartQuantity" disabled>
                <i class="fa-solid fa-plus sumQuantity"></i>
            </div>
            <span class="cartItemPrice">${precio}</span>
        </div>
        <span class="btnEliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item.getElementsByClassName('btnEliminar')[0].addEventListener('click', eliminarItemCarrito);

    var botonRestarCantidad = item.getElementsByClassName('restQuantity')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    var botonSumarCantidad = item.getElementsByClassName('sumQuantity')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    actulaizarTotalCarrito();
}

function pagarClicked(){
    alert("Gracias por la compra");

    var carritoItems = document.getElementsByClassName('itemsCart')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('cart')[0];
    carrito.style.display = 'block';

    var items =document.getElementsByClassName('containerItems')[0];
    items.style.width = '70%';
}