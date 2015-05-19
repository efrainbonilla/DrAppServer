<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use JMS\Serializer\Annotation\Accessor;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Type;
use Symfony\Component\Yaml\Parser;

/**
 * User
 *
 * @ORM\Table(name="usuarios")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\UserRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
 */
class User extends BaseUser
{
    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose
     */
    protected $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     * @Expose
     */
    protected $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="update_at", type="datetime", nullable=false)
     * @Expose
     */
    protected $updateAt;

    /**
     * @var Array
     *
     * @ORM\OneToMany(targetEntity="Casos", mappedBy="caseUser")
     */
    protected $casos;

    /**
     * @Accessor("getUsername")
     * @Expose
     * @SerializedName("username")
     * @Type("string")
     */
    private $__username;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Hook on pre-persist operations
     *
     * @ORM\PrePersist
     */
    public function prePersist()
    {
        $this->createdAt = new \DateTime;
        $this->updateAt = new \DateTime;
    }

    /**
     * Hook on pre-update operations
     *
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
        $this->updateAt = new \DateTime;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Get updateAt
     *
     * @return \DateTime
     */
    public function getUpdateAt()
    {
        return $this->updateAt;
    }

    /**
     * Add casos
     *
     * @param  \AppBundle\Entity\Casos $casos
     * @return User
     */
    public function addCaso(\AppBundle\Entity\Casos $casos)
    {
        $this->casos[] = $casos;

        return $this;
    }

    /**
     * Remove casos
     *
     * @param \AppBundle\Entity\Casos $casos
     */
    public function removeCaso(\AppBundle\Entity\Casos $casos)
    {
        $this->casos->removeElement($casos);
    }

    /**
     * Get casos
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCasos()
    {
        return $this->casos;
    }

    /**
     * Get RoleNames
     * @return array
     */
    public static function getRoleNames()
    {
        $pathToSecurity = __DIR__ . '/../../../..' . '/app/config/security.yml';
        $yaml = new Parser();
        $rolesArray = $yaml->parse(file_get_contents($pathToSecurity));
        $arrayKeys = array();
        foreach ($rolesArray['security']['role_hierarchy'] as $key => $value) {
            //never allow assigning super admin
            if ($key != 'ROLE_SUPER_ADMIN')
                $arrayKeys[$key] = User::convertRoleToLabel($key);
            //skip values that are arrays --- roles with multiple sub-roles
            if (!is_array($value))
                if ($value != 'ROLE_SUPER_ADMIN')
                    $arrayKeys[$value] = User::convertRoleToLabel($value);
        }
        //sort for display purposes
        asort($arrayKeys);

        return $arrayKeys;
    }

    static private function convertRoleToLabel($role)
    {
        $roleDisplay = str_replace('ROLE_', '', $role);
        $roleDisplay = str_replace('_', ' ', $roleDisplay);

        return ucwords(strtolower($roleDisplay));
    }
}
