import matplotlib.pyplot as plt
from scipy import ndimage as ndi
import numpy as np
from skimage import feature, io, filters, morphology, util

img = io.imread('./signature.jpg', as_gray=True)
sobel = filters.sobel(img)
blurred = filters.gaussian(sobel, sigma=2.0)


#Make the edges thicker by blurring the img
io.imsave('signature_edges.jpg', blurred)
light_spots = np.array((img > 245).nonzero()).T
dark_spots = np.array((img < 3).nonzero()).T

bool_mask = np.zeros(img.shape, dtype=np.bool)
bool_mask[tuple(light_spots.T)] = True
bool_mask[tuple(dark_spots.T)] = True
seed_mask, num_seeds = ndi.label(bool_mask)
print(num_seeds)
ws = morphology.watershed(blurred, seed_mask)
fig, (ax1, ax2) = plt.subplots(nrows=1, ncols=2, figsize=(8, 3),
                                    sharex=True, sharey=True)



ax2.imshow(blurred, cmap=plt.cm.gray)
ax2.axis('off')
ax2.set_title('blurred', fontsize=20)
ax1.imshow(img, cmap=plt.cm.gray)
ax1.axis('off')
ax1.set_title('orig', fontsize=20)


fig.tight_layout()

plt.show()
