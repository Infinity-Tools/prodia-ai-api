import axios from "axios";

/**
 * @param {{ prompt: string, negative_prompt: string, model: 
*    "3Guofeng3_v34.safetensors [50f420de]" | 
*    "absolutereality_v181.safetensors [3d9d4d2b]" | 
*    "absolutereality_V16.safetensors [37db0fc3]" | 
*    "amIReal_V41.safetensors [0a8a2e61]" | 
*    "analog-diffusion-1.0.ckpt [9ca13f02]" |
*    "anythingv3_0-pruned.ckpt [2700c435]" |
*    "anything-v4.5-pruned.ckpt [65745d25]" |
*    "anythingV5_PrtRE.safetensors [893e49b9]" |
*    "AOM3A3_orangemixs.safetensors [9600da17]" |
*    "blazing_drive_v10g.safetensors [ca1c1eab]" |
*    "cetusMix_Version35.safetensors [de2f2560]" |
*    "childrensStories_v13D.safetensors [9dfaabcb]" |
*    "childrensStories_v1SemiReal.safetensors [a1c56dbb]" |
*    "childrensStories_v1ToonAnime.safetensors [2ec7b88b]" |
*    "Counterfeit_v30.safetensors [9e2a8f19]" |
*    "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]" |
*    "cyberrealistic_v33.safetensors [82b0d085]" |
*    "dalcefo_v4.safetensors [425952fe]" |
*    "deliberate_v2.safetensors [10ec4b29]" |
*    "deliberate_v3.safetensors [afd9d2d4]" |
*    "dreamlike-anime-1.0.safetensors [4520e090]" |
*    "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]" |
*    "dreamlike-photoreal-2.0.safetensors [fdcf65e7]" |
*    "dreamshaper_6BakedVae.safetensors [114c8abb]" |
*    "dreamshaper_7.safetensors [5cf5ae06]" |
*    "dreamshaper_8.safetensors [9d40847d]" |
*    "edgeOfRealism_eorV20.safetensors [3ed5de15]" |
*    "EimisAnimeDiffusion_V1.ckpt [4f828a15]" |
*    "elldreths-vivid-mix.safetensors [342d9d26]" |
*    "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]" |
*    "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]" |
*    "juggernaut_aftermath.safetensors [5e20c455]" |
*    "lofi_v4.safetensors [ccc204d6]" |
*    "lyriel_v16.safetensors [68fceea2]" |
*    "majicmixRealistic_v4.safetensors [29d0de58]" |
*    "mechamix_v10.safetensors [ee685731]" |
*    "meinamix_meinaV9.safetensors [2ec66ab0]" |
*    "meinamix_meinaV11.safetensors [b56ce717]" |
*    "neverendingDream_v122.safetensors [f964ceeb]" |
*    "openjourney_V4.ckpt [ca2f377f]" |
*    "pastelMixStylizedAnime_pruned_fp16.safetensors [793a26e8]" |
*    "portraitplus_V1.0.safetensors [1400e684]" |
*    "protogenx34.safetensors [5896f8d5]" |
*    "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]" |
*    "Realistic_Vision_V2.0.safetensors [79587710]" |
*    "Realistic_Vision_V4.0.safetensors [29a7afaa]" |
*    "Realistic_Vision_V5.0.safetensors [614d1063]" |
*    "redshift_diffusion-V10.safetensors [1400e684]" |
*    "revAnimated_v122.safetensors [3f4fefd9]" |
*    "rundiffusionFX25D_v10.safetensors [cd12b0ee]" |
*    "rundiffusionFX_v10.safetensors [cd4e694d]" |
*    "sdv1_4.ckpt [7460a6fa]" |
*    "shoninsBeautiful_v10.safetensors [25d8c546]" |
*    "theallys-mix-ii-churned.safetensors [5d9225a4]" |
*    "timeless-1.0.ckpt [7c4971d4]" |
*    "toonyou_beta6.safetensors [980f6b15]"
* }}
* @returns
*/

export async function generateImage({ prompt, model, negative_prompt }) {

    const req = await axios.get(`https://api.prodia.com/generate?new=true&prompt=${prompt}&model=${model}&negative_prompt=${negative_prompt? negative_prompt : ""}&steps=20&cfg=7&seed=2021347789&sampler=DPM%2B%2B+2M+Karras&aspect_ratio=square&key=f0e14df7-88d2-4f80-a2f2-55171db4e862`)

    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                const req2 = await axios.get(`https://api.prodia.com/job/${req.data.job}`)
  
                if (req2.data.status === "succeeded") {
                    clearInterval(interval)
                    resolve({ status: 200, url: `https://images.prodia.xyz/${req.data.job}.png`})
                }
            } catch (error) {
                clearInterval(interval)
                reject(error)
            }
        }, 5000)
    })
}