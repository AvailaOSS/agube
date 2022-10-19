from collections import OrderedDict
from drf_yasg import openapi
from drf_yasg.inspectors import PaginatorInspector
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'num_pages': self.page.paginator.num_pages,
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'results': data
        })


class CustomPaginationInspector(PaginatorInspector):

    def get_paginated_response(self, paginator, response_schema):
        return openapi.Schema(
            title=type(paginator).__name__,
            type=openapi.TYPE_OBJECT,
            properties=OrderedDict(
                (('count', openapi.Schema(type=openapi.TYPE_INTEGER)),
                 ('num_pages', openapi.Schema(type=openapi.TYPE_INTEGER)),
                 ('links',
                  openapi.Schema(type=openapi.TYPE_OBJECT,
                                 properties=OrderedDict((
                                     ('next',
                                      openapi.Schema(type=openapi.TYPE_STRING,
                                                     format=openapi.FORMAT_URI,
                                                     x_nullable=True)),
                                     ('previous',
                                      openapi.Schema(type=openapi.TYPE_STRING,
                                                     format=openapi.FORMAT_URI,
                                                     x_nullable=True)),
                                 )))), ('results', response_schema))),
            required=['results'])
