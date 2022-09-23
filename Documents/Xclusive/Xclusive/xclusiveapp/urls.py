from django.urls import path


from . import views

urlpatterns = [
	#Leave as empty string for base url
	path('', views.store, name="store"),
	path('cart/', views.cart, name="cart"),
	path('checkout/', views.checkout, name="checkout"),
    path('search/', views.search_product, name='search_results'),
	path('update_item/', views.updateItem, name="update_item"),
    path('product_detail/<int:pk>/', views.product_detail, name='product_detail'),
	path('process_order/', views.processOrder, name="process_order"),

	

]