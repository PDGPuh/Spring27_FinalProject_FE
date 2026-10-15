# Chest X-ray sample attribution

Demo radiographs only. Not real patient data from this product. All files were
obtained from Wikimedia Commons under open / public-domain licenses suitable
for educational UI demos. Do not treat findings as clinical ground truth.

| Local file | Source (Wikimedia Commons) | License | Author / credit |
| --- | --- | --- | --- |
| `cxr-normal-pa.jpg` | [Normal posteroanterior (PA) chest radiograph (X-ray).jpg](https://commons.wikimedia.org/wiki/File:Normal_posteroanterior_(PA)_chest_radiograph_(X-ray).jpg) | CC0 1.0 | Mikael Häggström, M.D. |
| `cxr-normal-lat.jpg` | [Normal lateral chest radiograph (X-ray).jpg](https://commons.wikimedia.org/wiki/File:Normal_lateral_chest_radiograph_(X-ray).jpg) | CC0 1.0 | Mikael Häggström, M.D. |
| `cxr-normal-pa-2.jpg` | Derived from [Chest Xray PA 3-8-2010.png](https://commons.wikimedia.org/wiki/File:Chest_Xray_PA_3-8-2010.png) (JPEG conversion for web) | CC0 1.0 | Stillwaterising |
| `cxr-pneumonia-pa.jpg` | [X-ray of lobar pneumonia.jpg](https://commons.wikimedia.org/wiki/File:X-ray_of_lobar_pneumonia.jpg) | CC0 1.0 | Mikael Häggström, M.D. |
| `cxr-influenza-pa.jpg` | [Chest X-ray in influenza and Haemophilus influenzae.jpg](https://commons.wikimedia.org/wiki/File:Chest_X-ray_in_influenza_and_Haemophilus_influenzae.jpg) | CC0 1.0 | Mikael Häggström, M.D. |
| `cxr-chf-pa.jpg` | [Chest radiograph of a lung with Kerley B lines.jpg](https://commons.wikimedia.org/wiki/File:Chest_radiograph_of_a_lung_with_Kerley_B_lines.jpg) | CC0 1.0 | Mikael Häggström, M.D. |
| `cxr-chf-lat.jpg` | [Chest radiograph of a lung with Kerley B lines - lateral.jpg](https://commons.wikimedia.org/wiki/File:Chest_radiograph_of_a_lung_with_Kerley_B_lines_-_lateral.jpg) | CC0 1.0 | Mikael Häggström, M.D. |
| `cxr-pleural-effusion.jpg` | [Pleural effusion.jpg](https://commons.wikimedia.org/wiki/File:Pleural_effusion.jpg) | Public domain | Wikimedia Commons / public-domain medical illustration set |
| `cxr-pneumothorax.jpg` | [Expired X-ray of pneumothorax.jpg](https://commons.wikimedia.org/wiki/File:Expired_X-ray_of_pneumothorax.jpg) | CC0 1.0 | Mikael Häggström, M.D. |

## License notes

- **CC0 1.0**: public-domain dedication — copy, modify, and redistribute, including commercially, without permission.
- **Public domain**: no known copyright restriction for the listed file.
- Images may depict consented clinical cases published by their authors for education; they are not private records from this hospital demo.

## Demo case mapping

| Worklist case ID | Finding (demo) | Primary image |
| --- | --- | --- |
| `XR20261011-001` | Viêm phổi | `cxr-pneumonia-pa.jpg` |
| `XR20261011-002` | Tràn dịch | `cxr-pleural-effusion.jpg` |
| `XR20261011-003` | Bình thường | `cxr-normal-pa.jpg` (+ `cxr-normal-lat.jpg`) |
| `XR20261011-004` | Đông đặc | `cxr-influenza-pa.jpg` |
| `XR20261011-005` | Tim to | `cxr-chf-pa.jpg` (+ `cxr-chf-lat.jpg`) |
| `XR20261011-006` | Xẹp phổi | `cxr-pneumothorax.jpg` (distinct open lung pathology sample) |

Prior-study thumbnails use `cxr-normal-pa-2.jpg` where a second PA view is needed.
