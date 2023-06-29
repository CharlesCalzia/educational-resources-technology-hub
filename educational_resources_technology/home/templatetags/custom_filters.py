from django import template

register = template.Library()


@register.filter
def fix_img_path(value, arg="educational_resources_technology/"):
    return value.replace(arg, "")
