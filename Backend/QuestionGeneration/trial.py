from pprint import pprint
import nltk
nltk.download('stopwords')
from Backend.QuestionGeneration.predictingmcq import QGen

qe= QGen()
payload = {
            "input_text": """Reflection is the change in direction of a wavefront at an interface between two different media so that the wavefront returns into the medium from which it originated. Common examples include the reflection of light, sound and water waves. The law of reflection says that for specular reflection (for example at a mirror) the angle at which the wave is incident on the surface equals the angle at which it is reflected.

In acoustics, reflection causes echoes and is used in sonar. In geology, it is important in the study of seismic waves. Reflection is observed with surface waves in bodies of water. Reflection is observed with many types of electromagnetic wave, besides visible light. Reflection of VHF and higher frequencies is important for radio transmission and for radar. Even hard X-rays and gamma rays can be reflected at shallow angles with special "grazing" mirrors.

Reflection of light is either specular (mirror-like) or diffuse (retaining the energy, but losing the image) depending on the nature of the interface. In specular reflection the phase of the reflected waves depends on the choice of the origin of coordinates, but the relative phase between s and p (TE and TM) polarizations is fixed by the properties of the media and of the interface between them.

A mirror provides the most common model for specular light reflection, and typically consists of a glass sheet with a metallic coating where the significant reflection occurs. Reflection is enhanced in metals by suppression of wave propagation beyond their skin depths. Reflection also occurs at the surface of transparent media, such as water or glass.


Diagram of specular reflection
In the diagram, a light ray PO strikes a vertical mirror at point O, and the reflected ray is OQ. By projecting an imaginary line through point O perpendicular to the mirror, known as the normal, we can measure the angle of incidence, θi and the angle of reflection, θr. The law of reflection states that θi = θr, or in other words, the angle of incidence equals the angle of reflection.

In fact, reflection of light may occur whenever light travels from a medium of a given refractive index into a medium with a different refractive index. In the most general case, a certain fraction of the light is reflected from the interface, and the remainder is refracted. Solving Maxwell's equations for a light ray striking a boundary allows the derivation of the Fresnel equations, which can be used to predict how much of the light is reflected, and how much is refracted in a given situation. This is analogous to the way impedance mismatch in an electric circuit causes reflection of signals. Total internal reflection of light from a denser medium occurs if the angle of incidence is greater than the critical angle.

Total internal reflection is used as a means of focusing waves that cannot effectively be reflected by common means. X-ray telescopes are constructed by creating a converging "tunnel" for the waves. As the waves interact at low angle with the surface of this tunnel they are reflected toward the focus point (or toward another interaction with the tunnel surface, eventually being directed to the detector at the focus). A conventional reflector would be useless as the X-rays would simply pass through the intended reflector.

When light reflects off of a material with higher refractive index than the medium in which is traveling, it undergoes a 180° phase shift. In contrast, when light reflects off of a material with lower refractive index the reflected light is in phase with the incident light. This is an important principle in the field of thin-film optics.

Specular reflection forms images. Reflection from a flat surface forms a mirror image, which appears to be reversed from left to right because we compare the image we see to what we would see if we were rotated into the position of the image. Specular reflection at a curved surface forms an image which may be magnified or demagnified; curved mirrors have optical power. Such mirrors may have surfaces that are spherical or parabolic."""
        }
output = qe.predict_mcq(payload)
print(output)

