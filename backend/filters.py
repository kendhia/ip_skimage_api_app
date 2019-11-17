from skimage import data, io, filters
import numpy as np
from skimage import restoration


"""
sigma  =9
smooth = filters.gaussian(pixelated_float, sigma)
io.imsave('1_filtered.jpeg', smooth)
laplace_image = filters.laplace(image)
io.imsave('1_laplace.jpeg', laplace_image)
"""

list_of_filters = {
    "laplace": filters.laplace, 
    "gaussian": filters.gaussian, 
    "median": filters.median, 
    "tv": restoration.denoise_tv_chambolle,
    "prewitt": filters.prewitt,
    "roberts": filters.roberts,
    "frangi": filters.frangi,
    "meijering": filters.meijering,
    "scharr": filters.scharr
    }
   # https://scikit-image.org/docs/dev/auto_examples/segmentation/plot_boundary_merge.html#sphx-glr-auto-examples-segmentation-plot-boundary-merge-py

def apply_filter(name_of_filter, extra_arg=None):
    image = io.imread("1.jpeg", as_gray=True)
    new_image = list_of_filters[name_of_filter](image, extra_arg)
    io.imsave(f"{name_of_filter}.jpeg", new_image)
    return f"{name_of_filter}.jpeg"

#apply_filter("meijering", image, [1, 1])
# print(apply_filter("scharr"))