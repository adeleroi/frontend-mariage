import { Paragraph, H1, H2, H4, H3 } from "../components/typography"
import { Cutdown } from "../components/cutdown"
import Fleurs from "../image/fleurs.jpeg"


export const InfoUtiles = () => {
  return (
    <>
      <div className="lg:mx-24 xl:mx-44  px-5 lg:px-0 flex flex-col max-w-8xl block mb-32">
        <div className="flex">
          <div className="lg:mb-24 flex flex-col sm:items-center lg:items-start justify-start w-full">
            <H1 className="text-center sm:text-left mt-32 sm:mb-3 md:mb-8 lg:mb-3 text-secondary">Infos utiles</H1>
            <H1 className="text-center sm:text-left mt-5 mb-4">Quelques indications pour le bon <br/> déroulement de la cérémonie</H1>
            <H4 className="text-gray w-full text-center lg:text-left ">N'hésitez pas à nous écrire si vous avez des questions.</H4>
          </div>
          <Cutdown vertical className="hidden 2xl:flex self-center"/>
        </div>
        <div className="w-full lg:mt-24 flex lg:items-start items-center lg:justify-between lg:flex-row  flex-col">
          <div className="flex flex-col mt-32 lg:mt-0 2xl:flex-row xl:justify-between">
            <div>
              <H2 className="mb-10 text-secondary">Invitation intuitu personae</H2>
              <H3 className="text-left mt-5 mb-4 text-secondary mb-5">Chers parents et ami.e.s,</H3>
              <Paragraph className='text-left text-lg xl:text-xl 2xl:mb-0 font-thin leading-10 2xl:mr-12'>
                Infiniment merci pour votre soutien à travers ce chemin de vie devant lequel nous nous engageons sous le regard de Dieu.

                En ces temps incertains, nous vous prions de bien vouloir nous aider à conserver un effectif raisonnable, de sorte à pouvoir partager ces moments avec vous, advenant l’hypothèse (évidemment non souhaitée) où les mesures de lutte contre la pandémie changeraient (ex: la limite pour les regroupements sociaux serait fortement diminuée).

                L’une des façons pour ce faire serait d’adhérer pleinement au caractère personnel de l’invitation qui vous est adressé.e.

                Nous vous remercions par avance pour votre compréhension.
              </Paragraph>
            </div>
            {/* <img src={Fleurs} alt="jarding" className="w-96 rounded-lg 2xl:ml-8"/> */}
          </div>
        </div>
        <div className="w-full lg:mt-24 flex lg:items-start items-center lg:justify-between lg:flex-row  flex-col">
          <div className="flex flex-col mt-20 lg:mt-0 2xl:flex-row xl:justify-between">
            <div>
              <H3 className="text-left mt-5 mb-4 text-secondary">Mesures COVID</H3>
              <Paragraph className='text-left text-lg xl:text-xl 2xl:mb-0 font-thin leading-10 2xl:mr-12'>
                Le contexte actuel appelle notre responsabilité collective pour venir à bout de cette pandémie, afin de retrouver une vie normale.
                Aussi, nous vous prions toutes et tous de bien vouloir respecter les mesures de prévention contre le coronavirus,
                notamment le port du masque et la distanciation sociale, sauf dans les situations où la santé publique accepte que ces mesures soient allégées (par exemple,
                à table, au moment de la réception). D’une manière générale, la Seigneurie de l’Île d’Orléans pourra exiger le respect des mesures des invité.e.s présent.e.s telles que définies par le gouvernement.
              </Paragraph>
            </div>
            {/* <img src={Fleurs} alt="jarding" className="w-96 rounded-lg 2xl:ml-8 mr-8"/> */}
          </div>
        </div>
        <div className="w-full lg:mt-24 flex lg:items-start items-center lg:justify-between lg:flex-row  flex-col">
          <div className="flex flex-col mt-20 lg:mt-0 2xl:flex-row xl:justify-between">
            <div>
              <H3 className="text-left mt-5 mb-4 text-secondary">Photos et Vidéos </H3>
                <Paragraph className='text-left text-lg xl:text-xl 2xl:mb-0 font-thin leading-10 2xl:mr-12'>
                Nous sommes véritablement heureux de pouvoir compter sur votre soutien et votre accompagnement.
                Les photos et vidéos qui pourront être prises ce jour constituent de beaux souvenirs cristallisant ce jour unique pour nous. Nous vous demandons s.v.p. de vous abstenir de faire circuler ces photos et vidéos sur vos différents réseaux, afin de préserver l’intimité du moment tel que nous le souhaitons.
                C’est donc une invitation au respect du caractère privé de l’évènement, et nous savons compter sur votre maturité pour y arriver, ensemble.
              </Paragraph>
            </div>
            {/* <img src={Fleurs} alt="jarding" className="w-96 rounded-lg 2xl:ml-8"/> */}
          </div>
        </div>
        <div className="w-full lg:mt-24 flex lg:items-start items-center lg:justify-between lg:flex-row  flex-col">
          <div className="flex flex-col mt-16 lg:mt-0 2xl:flex-row xl:justify-between">
            <div>
              <H3 className="text-left mt-5 mb-4 text-secondary">Cadeaux</H3>
              <Paragraph className='text-left text-lg xl:text-xl 2xl:mb-0 font-thin leading-10 2xl:mr-12'>
              Nous n'avons pas de liste de cadeaux prédéfinie. Si vous n’avez pas d’idées de cadeaux (parce qu’après tout, c’est quand même pas si facile d’en trouver😅😅), ou que vous craignez qu’une ou plusieurs personnes personnes offrent la même chose que vous, ne vous en faites pas plus : nous prendrons vos dons en espèces ☺️.
              </Paragraph>
            </div>
          </div>
        </div>
        <img src={Fleurs} alt="jarding" width="450px" className="rounded-lg self-center flex md:self-end mt-32"/>
      </div>
    </>
  )
}